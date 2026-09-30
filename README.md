# SPFx Font Awesome icon picker

This SharePoint Framework web part lets nontechnical page authors add approved
Font Awesome SVG icons to modern pages. The icon definitions are included in the
solution, so the browser does not connect to the public Font Awesome CDN.

## Author experience

After adding **APL Icon Picker** to a page, the author uses the standard
SharePoint property pane to:

- Select an approved icon
- Set its size and brand color
- Provide an accessible label
- Show or hide the visible label
- Add an optional link
- Choose whether the link opens in a new tab

The sample deliberately exposes a small approved icon set. Add explicit imports
and property-pane choices when your organization approves more icons.

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
2. Enable the app.
3. Add the app only to a dedicated test site, or approve broader deployment.
4. Add **APL Icon Picker** to a modern page.
5. Configure the icon through the property pane.
6. In browser developer tools, confirm that the SPFx bundle comes from the
   tenant App Catalog and no Font Awesome CDN request occurs.

The package has `includeClientSideAssets` enabled. SharePoint therefore hosts
the generated client-side bundle with the deployed solution.

## Scope

This sample gives page authors a no-code icon web part. It does not add icons
inside SharePoint's standard Text web part or replace native SharePoint icons.

## References

- [SharePoint Framework overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Set up a Microsoft 365 tenant and App Catalog](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Bundle an external library in SPFx](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/basics/add-an-external-library)
- [Migrate Script Editor customizations to SPFx](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-script-editor-web-part-customizations)
