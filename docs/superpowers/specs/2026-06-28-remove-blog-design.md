# Design Specification - Remove Blog Section

This document specifies the design for removing public access and links to the blog section on `fintaxvers.com` while retaining the code files for possible future restoration.

## Proposed Changes

### UI Cleanups (Remove links to Blog)

We will remove all links pointing to the `/blog` section from the user interface:
- **Navbar:** Remove the `Blog` link in [Navbar.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/components/common/Navbar.jsx).
- **Home Footer:** Remove the `Financial Insights Blog` link from [UserPortal.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/UserPortal.jsx).
- **Links Footer:** Remove the `Financial Insights Blog` link from [Links.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/pages/Links.jsx).
- **Calculators Page:** Remove the purple `Read Our Blog` action button from [Calculators.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/Calculators.jsx).
- **Service Detail Page:** Remove the purple `📖 Read Our Blog` action button from [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx).

### Router Updates (Set up Redirects)

We will update [App.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/App.jsx) to redirect `/blog` and `/blog/:slug` routes back to the home page:
- Import `Navigate` if not already imported or verify usage.
- Update `/blog` and `/blog/:slug` routes to return `<Navigate to="/" replace />`.
- Retain the source files `src/portals/user/Blog.jsx`, `src/portals/user/BlogPost.jsx`, and `src/data/blogData.js` in the repository without deleting them.

## Verification Plan

- Navigate to `/blog` and `/blog/any-slug` and verify it redirects to `/`.
- Verify the Blog link is gone from the header/navbar.
- Verify the Blog links are gone from footers.
- Verify the Blog buttons are gone from Calculators and Service Details pages.
