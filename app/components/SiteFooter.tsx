import { Link } from "react-router";

import { site } from "~/content/site";
import { t } from "~/i18n";

export function SiteFooter() {
  return (
    <footer className="bg-night text-night-muted">
      <div className="page flex flex-wrap justify-between gap-3 py-6 text-[13px]">
        <span>
          © {site.copyrightYear} {site.name}
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="font-mono">
            {t.footer.builtWith} ·{" "}
            <a href={site.repository} className="text-night-ink underline">
              {t.footer.sourceCode}
            </a>
          </span>
          <Link to="/mentions-legales" className="text-night-ink underline">
            {t.footer.legal}
          </Link>
        </span>
      </div>
    </footer>
  );
}
