# SPFx Font Awesome test

This SharePoint Framework web part renders selected Font Awesome SVG icons from
packages included in the solution. It does not configure or call the public Font
Awesome CDN.

## Prerequisites

- Node.js 22.14 or later, but earlier than Node.js 23
- Access to a SharePoint Online tenant App Catalog
- Permission to deploy an App Catalog package

## Build

```powershell
npm install
npm run build
```

The deployable package is:

```text
sharepoint\solution\spfx-fontawesome-test.sppkg
```

## Deploy and test

1. Upload the `.sppkg` file to the tenant App Catalog.
2. Select **Enable this app and add it to all sites** for this temporary test,
   or add the app only to a dedicated test site.
3. Add **FontAwesomeTest** to a modern SharePoint page.
4. Open the browser developer tools and select **Network**.
5. Reload the page.
6. Search the requests for `fontawesome`, `fortawesome`, `use.fontawesome.com`,
   and `kit.fontawesome.com`.
7. Confirm that the icons render and no Font Awesome network request appears.

The package has `includeClientSideAssets` enabled. SharePoint therefore hosts
the generated client-side bundle with the deployed solution.

## Scope

This test proves that Font Awesome icon definitions can be bundled with an SPFx
component. It does not replace fonts or icons in SharePoint's native interface.

## References

- [SharePoint Framework overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Set up a Microsoft 365 tenant and App Catalog](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Bundle an external library in SPFx](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/basics/add-an-external-library)
- [Migrate Script Editor customizations to SPFx](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-script-editor-web-part-customizations)
