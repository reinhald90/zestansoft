import "./style.css";
import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const $app = document.getElementById("app");
const DEFAULT_ROOM = { id: "umum", name: "Umum" };

let currentUser = null;
let currentRoom = DEFAULT_ROOM;
let unsubMessages = null;
let unsubRooms = null;
let confirmationResult = null;
let recaptcha = null;

/* ---------- util ---------- */
function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== false && v != null) el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(c));
  }
  return el;
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function initials(name = "?") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "?") + (parts[1]?.[0] || "")).toUpperCase();
}

function fmtTime(date) {
  if (!date) return "";
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return sameDay
    ? time
    : date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) + ", " + time;
}

const ERRORS = {
  "auth/invalid-email": "Format email tidak valid.",
  "auth/user-not-found": "Akun tidak ditemukan. Coba daftar dulu.",
  "auth/wrong-password": "Kata sandi salah.",
  "auth/invalid-credential": "Email atau kata sandi salah.",
  "auth/email-already-in-use": "Email ini sudah terdaftar. Silakan masuk.",
  "auth/weak-password": "Kata sandi minimal 6 karakter.",
  "auth/popup-closed-by-user": "Jendela masuk Google ditutup sebelum selesai.",
  "auth/popup-blocked": "Pop-up diblokir browser. Izinkan pop-up lalu coba lagi.",
  "auth/invalid-phone-number": "Nomor telepon tidak valid. Gunakan format +62812xxxx.",
  "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi beberapa menit lagi.",
  "auth/invalid-verification-code": "Kode verifikasi salah.",
  "auth/code-expired": "Kode kedaluwarsa. Kirim ulang kode.",
  "auth/quota-exceeded": "Kuota SMS harian habis. Coba lagi besok atau pakai metode lain.",
  "auth/unauthorized-domain":
    "Domain ini belum diizinkan. Tambahkan di Firebase → Authentication → Settings → Authorized domains.",
  "auth/network-request-failed": "Koneksi bermasalah. Periksa internetmu.",
};
const errMsg = (e) => ERRORS[e.code] || e.message || "Terjadi kesalahan.";

/* ---------- layar masuk ---------- */
function renderAuth() {
  cleanupChat();
  let mode = "masuk"; // masuk | daftar | telepon
  const msg = h("p", { class: "auth-msg", role: "alert" });
  const body = h("div", { class: "auth-body" });
  const tabs = h("div", { class: "tabs", role: "tablist" });

  const setMsg = (t, ok = false) => {
    msg.textContent = t || "";
    msg.className = "auth-msg" + (ok ? " ok" : "");
  };

  function drawTabs() {
    tabs.replaceChildren(
      ...[
        ["masuk", "Masuk"],
        ["daftar", "Daftar"],
        ["telepon", "Telepon"],
      ].map(([key, label]) =>
        h(
          "button",
          {
            type: "button",
            role: "tab",
            class: "tab" + (mode === key ? " active" : ""),
            "aria-selected": String(mode === key),
            onClick: () => {
              mode = key;
              setMsg("");
              draw();
            },
          },
          label
        )
      )
    );
  }

  function draw() {
    drawTabs();
    if (mode === "telepon") body.replaceChildren(phoneForm());
    else body.replaceChildren(emailForm());
  }

  function emailForm() {
    const isRegister = mode === "daftar";
    const name = h("input", { type: "text", placeholder: "Nama tampilan", autocomplete: "name", required: true });
    const email = h("input", { type: "email", placeholder: "Email", autocomplete: "email", required: true });
    const pass = h("input", {
      type: "password",
      placeholder: "Kata sandi",
      autocomplete: isRegister ? "new-password" : "current-password",
      minlength: "6",
      required: true,
    });
    const btn = h("button", { class: "btn primary", type: "submit" }, isRegister ? "Buat akun" : "Masuk");
    const form = h(
      "form",
      {
        class: "form",
        onSubmit: async (e) => {
          e.preventDefault();
          btn.disabled = true;
          setMsg("");
          try {
            if (isRegister) {
              const cred = await createUserWithEmailAndPassword(auth, email.value.trim(), pass.value);
              await updateProfile(cred.user, { displayName: name.value.trim() });
              currentUser = auth.currentUser;
              renderChat();
            } else {
              await signInWithEmailAndPassword(auth, email.value.trim(), pass.value);
            }
          } catch (err) {
            setMsg(errMsg(err));
            btn.disabled = false;
          }
        },
      },
      isRegister ? name : null,
      email,
      pass,
      btn,
      !isRegister
        ? h(
            "button",
            {
              type: "button",
              class: "link",
              onClick: async () => {
                if (!email.value.trim()) return setMsg("Isi email dulu, lalu klik lagi.");
                try {
                  await sendPasswordResetEmail(auth, email.value.trim());
                  setMsg("Tautan atur ulang kata sandi sudah dikirim ke email.", true);
                } catch (err) {
                  setMsg(errMsg(err));
                }
              },
            },
            "Lupa kata sandi?"
          )
        : null
    );
    return h(
      "div",
      {},
      form,
      h("div", { class: "divider" }, h("span", {}, "atau")),
      h(
        "button",
        {
          type: "button",
          class: "btn google",
          onClick: async () => {
            setMsg("");
            try {
              await signInWithPopup(auth, new GoogleAuthProvider());
            } catch (err) {
              setMsg(errMsg(err));
            }
          },
        },
        h("span", { class: "g-logo", "aria-hidden": "true" }, "G"),
        "Lanjut dengan Google"
      )
    );
  }

  function phoneForm() {
    const phone = h("input", {
      type: "tel",
      placeholder: "+62812xxxxxxx",
      autocomplete: "tel",
      inputmode: "tel",
      required: true,
    });
    const code = h("input", {
      type: "text",
      placeholder: "Kode 6 digit",
      inputmode: "numeric",
      autocomplete: "one-time-code",
      maxlength: "6",
    });
    const sendBtn = h("button", { class: "btn primary", type: "submit" }, "Kirim kode");
    const verifyBtn = h("button", { class: "btn primary", type: "button" }, "Verifikasi");
    const codeBox = h("div", { class: "form hidden" }, code, verifyBtn);
    const recaptchaBox = h("div", { id: "recaptcha-container" });

    const form = h(
      "form",
      {
        class: "form",
        onSubmit: async (e) => {
          e.preventDefault();
          sendBtn.disabled = true;
          setMsg("");
          try {
            if (recaptcha) {
              try { recaptcha.clear(); } catch {}
              recaptcha = null;
            }
            recaptchaBox.replaceChildren();
            recaptcha = new RecaptchaVerifier(auth, recaptchaBox, { size: "invisible" });
            confirmationResult = await signInWithPhoneNumber(auth, phone.value.trim(), recaptcha);
            codeBox.classList.remove("hidden");
            code.focus();
            setMsg("Kode dikirim lewat SMS. Masukkan di bawah.", true);
          } catch (err) {
            setMsg(errMsg(err));
          }
          sendBtn.disabled = false;
        },
      },
      phone,
      sendBtn
    );

    verifyBtn.addEventListener("click", async () => {
      if (!confirmationResult) return;
      verifyBtn.disabled = true;
      setMsg("");
      try {
        const cred = await confirmationResult.confirm(code.value.trim());
        if (!cred.user.displayName) {
          await updateProfile(cred.user, { displayName: "Pengguna " + cred.user.phoneNumber?.slice(-4) });
          currentUser = auth.currentUser;
          renderChat();
        }
      } catch (err) {
        setMsg(errMsg(err));
        verifyBtn.disabled = false;
      }
    });

    return h(
      "div",
      {},
      form,
      codeBox,
      recaptchaBox,
      h("p", { class: "hint" }, "Gunakan kode negara, contoh +62 untuk Indonesia. Kuota SMS gratis 10 per hari.")
    );
  }

  draw();
  $app.replaceChildren(
    h(
      "main",
      { class: "auth" },
      h(
        "section",
        { class: "auth-card" },
        h("div", { class: "brand" }, h("span", { class: "brand-mark" }, "Z"), h("h1", {}, "Zestansoft App")),
        h("p", { class: "tagline" }, "Ngobrol langsung dengan timmu, tanpa ribet."),
        tabs,
        body,
        msg
      )
    )
  );
}

/* ---------- layar chat ---------- */
function cleanupChat() {
  unsubMessages?.();
  unsubRooms?.();
  unsubMessages = unsubRooms = null;
}

function renderChat() {
  cleanupChat();

  const roomList = h("ul", { class: "rooms" });
  const messagesEl = h("div", { class: "messages", role: "log", "aria-live": "polite" });
  const title = h("h2", {}, currentRoom.name);
  const sidebar = h("aside", { class: "sidebar" });
  const input = h("textarea", {
    rows: "1",
    placeholder: "Tulis pesan…",
    maxlength: "2000",
    "aria-label": "Tulis pesan",
  });

  const name = currentUser.displayName || currentUser.email || currentUser.phoneNumber || "Pengguna";

  /* sidebar */
  const newRoomInput = h("input", { type: "text", placeholder: "Nama ruang baru", maxlength: "40" });
  const newRoomForm = h(
    "form",
    {
      class: "new-room",
      onSubmit: async (e) => {
        e.preventDefault();
        const label = newRoomInput.value.trim();
        const id = slugify(label);
        if (!id) return;
        await setDoc(doc(db, "rooms", id), { name: label, createdAt: serverTimestamp(), createdBy: currentUser.uid }, { merge: true });
        newRoomInput.value = "";
        selectRoom({ id, name: label });
      },
    },
    newRoomInput,
    h("button", { class: "btn small", type: "submit", "aria-label": "Buat ruang" }, "Buat")
  );

  sidebar.append(
    h("div", { class: "side-head" }, h("span", { class: "brand-mark sm" }, "Z"), h("strong", {}, "Zestansoft")),
    h("p", { class: "side-label" }, "Ruang obrolan"),
    roomList,
    newRoomForm,
    h(
      "div",
      { class: "me" },
      h("span", { class: "avatar" }, currentUser.photoURL ? h("img", { src: currentUser.photoURL, alt: "", referrerpolicy: "no-referrer" }) : initials(name)),
      h("span", { class: "me-name" }, name),
      h("button", { class: "link light", type: "button", onClick: () => signOut(auth) }, "Keluar")
    )
  );

  const backdrop = h("div", { class: "backdrop", onClick: () => document.body.classList.remove("nav-open") });

  function drawRooms(rooms) {
    roomList.replaceChildren(
      ...rooms.map((r) =>
        h(
          "li",
          {},
          h(
            "button",
            {
              type: "button",
              class: "room" + (r.id === currentRoom.id ? " active" : ""),
              onClick: () => selectRoom(r),
            },
            h("span", { class: "hash", "aria-hidden": "true" }, "#"),
            r.name
          )
        )
      )
    );
  }

  let roomsCache = [DEFAULT_ROOM];
  function selectRoom(r) {
    currentRoom = r;
    title.textContent = r.name;
    document.body.classList.remove("nav-open");
    drawRooms(roomsCache);
    listenMessages();
    input.focus();
  }

  /* pesan */
  function listenMessages() {
    unsubMessages?.();
    messagesEl.replaceChildren(h("p", { class: "empty" }, "Memuat pesan…"));
    const q = query(
      collection(db, "rooms", currentRoom.id, "messages"),
      orderBy("createdAt", "desc"),
      limit(100)
    );
    unsubMessages = onSnapshot(
      q,
      (snap) => {
        const nearBottom = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 120;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: "estimate" }) })).reverse();
        if (!docs.length) {
          messagesEl.replaceChildren(h("p", { class: "empty" }, "Belum ada pesan di ruang ini. Kirim yang pertama."));
          return;
        }
        let prevUid = null;
        messagesEl.replaceChildren(
          ...docs.map((m) => {
            const mine = m.uid === currentUser.uid;
            const first = m.uid !== prevUid;
            prevUid = m.uid;
            return h(
              "div",
              { class: "msg" + (mine ? " mine" : "") + (first ? " first" : "") },
              !mine
                ? h("span", { class: "avatar" + (first ? "" : " ghost") }, m.photo ? h("img", { src: m.photo, alt: "", referrerpolicy: "no-referrer" }) : initials(m.name))
                : null,
              h(
                "div",
                { class: "bubble" },
                !mine && first ? h("span", { class: "who" }, m.name) : null,
                h("p", {}, m.text),
                h("time", {}, fmtTime(m.createdAt?.toDate?.()))
              )
            );
          })
        );
        if (nearBottom || snap.metadata.hasPendingWrites) messagesEl.scrollTop = messagesEl.scrollHeight;
      },
      (err) => {
        messagesEl.replaceChildren(
          h("p", { class: "empty error" }, "Tidak bisa memuat pesan: " + err.message + ". Pastikan Firestore sudah dibuat dan rules sudah dipasang.")
        );
      }
    );
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    autoGrow();
    try {
      await addDoc(collection(db, "rooms", currentRoom.id, "messages"), {
        text,
        uid: currentUser.uid,
        name,
        photo: currentUser.photoURL || null,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      input.value = text;
      alert("Pesan gagal terkirim: " + err.message);
    }
  }

  function autoGrow() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 140) + "px";
  }
  input.addEventListener("input", autoGrow);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      send();
    }
  });

  $app.replaceChildren(
    h(
      "div",
      { class: "shell" },
      sidebar,
      backdrop,
      h(
        "main",
        { class: "chat" },
        h(
          "header",
          { class: "chat-head" },
          h("button", { class: "menu", type: "button", "aria-label": "Buka daftar ruang", onClick: () => document.body.classList.add("nav-open") }, "☰"),
          h("span", { class: "hash big", "aria-hidden": "true" }, "#"),
          title
        ),
        messagesEl,
        h(
          "form",
          { class: "composer", onSubmit: (e) => { e.preventDefault(); send(); } },
          input,
          h("button", { class: "btn primary send", type: "submit" }, "Kirim")
        )
      )
    )
  );

  // pastikan ruang "Umum" ada, lalu pantau daftar ruang
  setDoc(doc(db, "rooms", DEFAULT_ROOM.id), { name: DEFAULT_ROOM.name }, { merge: true }).catch(() => {});
  unsubRooms = onSnapshot(
    query(collection(db, "rooms"), orderBy("name")),
    (snap) => {
      roomsCache = snap.docs.map((d) => ({ id: d.id, name: d.data().name || d.id }));
      if (!roomsCache.some((r) => r.id === DEFAULT_ROOM.id)) roomsCache.unshift(DEFAULT_ROOM);
      drawRooms(roomsCache);
    },
    () => drawRooms(roomsCache)
  );
  drawRooms(roomsCache);
  listenMessages();
}

/* ---------- mulai ---------- */
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) renderChat();
  else renderAuth();
});
