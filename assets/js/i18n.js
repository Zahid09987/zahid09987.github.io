import { FluentBundle, FluentResource } from "@fluent/bundle";
import { DOMLocalization } from "@fluent/dom";

async function fetchResource(locale, resourceId) {
  const response = await fetch(`/locale/${locale}/${resourceId}.ftl`);
  return response.text();
}

async function initLocalization(locale = "en-US") {
  const bundle = new FluentBundle(locale);
  const source = await fetchResource(locale, "main");
  const resource = new FluentResource(source);
  bundle.addResource(resource);

  const l10n = new DOMLocalization(
    [`/locale/${locale}/main.ftl`],
    (resourceIds) => {
      return resourceIds.map(() => bundle);
    },
  );

  l10n.connectRoot(document.documentElement);
  l10n.translateRoots();

  return { bundle, l10n };
}
