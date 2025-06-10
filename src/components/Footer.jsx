function Footer() {
  return (
    <div className="fixed-bottom bg-primary d-flex justify-content-between align-items-center px-2 ">
      <b className="text-orange">
        {" "}
        כל הזכיות שמורות <i class="bi bi-c-circle"></i>{" "}
        {new Date().getFullYear()}
      </b>
      <div className="d-flex gap-4">
        <i className="bi bi-envelope-at-fill text-orange">
          <b className="ms-1"> arielhodaya@gmail.com</b>
        </i>

        <a
          href="https://wa.me/972506595538"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp text-orange">
            <b className="me-1">שלחו וואטצאפ</b>
          </i>
        </a>
      </div>
      <div>
        <h1 className="navbar-brand fw-bold text-orange fs-5">FURCHAN</h1>
      </div>
    </div>
  );
}

export default Footer;
