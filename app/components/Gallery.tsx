interface GalleryProps {
  images: string[];
  category: "original" | "scrap";
  year: number;
  isOriginal: boolean;
  isScrap: boolean;
}

export function Gallery({
  images,
  category,
  year,
  isOriginal,
  isScrap,
}: GalleryProps) {

  return (
    <>
      {/* navigation */}
      <header id="header">
        <nav
          className="navbar navbar-default navbar-fixed-top"
          role="navigation"
        >
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">
                RakugakiYa
              </a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a
                    href="original.html"
                    className={isOriginal ? "active" : undefined}
                  >
                    Original
                  </a>
                </li>
                <li>
                  <a
                    href="scrap.html"
                    className={isScrap ? "active" : undefined}
                  >
                    Scrap
                  </a>
                </li>
                <li>
                  <a href="http://about.me/kinzal">About me</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* navigation */}

      {/* contents */}
      <div className="container-fluid" id="content">
        {images.map((img: string) => (
          <div className="row" id={img} key={`view-${img}`}>
            <a href="#">
              <img data-echo={`app/images/${category}/${img}`} lazyload="1" />
            </a>
          </div>
        ))}
        <div className="row">
          {images.map((img: string) => (
            <div
              className="column col-xs-6 col-sm-3 col-md-2"
              key={`thumb-${img}`}
            >
              <a href={`#${img}`} className="thumbnail">
                <img
                  src="app/images/empty.png"
                  width={400}
                  height={400}
                  data-echo={`app/images/${category}/${img}`}
                  lazyload="1"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* contents */}

      {/* footer */}
      <footer id="footer">
        <div className="container-fluid">
          <ul className="sorcial-icons list-inline pull-left">
            <li>
              <a
                href="http://twitter.com/share?count=horizontal&original_referer=http://www.kinzal.net/&text=RakugakiYa&tw_p=tweetbutton&url=http://www.kinzal.net/"
                className="btn btn-social-icon btn-twitter"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    (e.currentTarget as HTMLAnchorElement).href,
                    "tweetwindow",
                    "width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1"
                  );
                }}
              >
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="http://www.facebook.com/share.php?u=http://www.kinzal.net/"
                className="btn btn-social-icon btn-facebook"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    (e.currentTarget as HTMLAnchorElement).href,
                    "FBwindow",
                    "width=650, height=450, menubar=no, toolbar=no, scrollbars=yes"
                  );
                }}
              >
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://plus.google.com/share?url=http://www.kinzal.net/"
                className="btn btn-social-icon btn-google-plus"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    (e.currentTarget as HTMLAnchorElement).href,
                    "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
                  );
                }}
              >
                <i className="fa fa-google-plus"></i>
              </a>
            </li>
          </ul>
          <p className="copy-right pull-right">
            &copy; 2005-{year}, kinzal.net
          </p>
        </div>
      </footer>
      {/* footer */}
    </>
  );
}
