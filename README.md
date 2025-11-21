# NUSH Flipbook

The NUSH Flipbook project aims to provide a flipbook-like interface to display PDF files.  

This project was created by Jun Rong (Class of 2022), with contributions from Wenkai (Class of 2024) and Yue Heng (Class of 2025).  

## Overview
The site is an extremely simple static site, functioning as a wrapper around the [3dflipbook](https://3dflipbook.net/getting-started) JS library.
`index.html` defines the structure of the website, while `assets/js/index.js` controls the logic.  

As it is a static site, we are hosting the app on DigitalOcean using the App Platform, providing (basically) free-of-charge autoscaling and hosting.
Flipbooks are stored on DigitalOcean Spaces, with CDN enabled for quick and scalable access.

## Future Work
- A redesign of the app to host more varied content would be helpful. This can be used to host other school publications e.g. those from other IGs.
- Look into how we got the paid version of the plugin and see if we can get the product key/latest version?
- Probably fix CORS, idk feels kinda scuffed allowing all right now

## NOTE TO CONTRIBUTORS 
To make the changes reflect on the [https://flipbook.nush.app](https://flipbook.nush.app/) website, please bring the changes to the ```digitalocean``` branch (either through direct commits, or a pull request, or any other possible methods); then, DigitalOcean will start building it as a new deployment. 

## Tutorials
### How do I upload a new flipbook?
1. Set a unique identifier for your flipbook. Usually, this is an easy-to-remember, alphanumeric, no-spaces string, like `20-anniversary`.
2. Name your flipbook `<identifier>.pdf`, and upload it to the `nush-flipbooks` Spaces bucket on DigitalOcean.
3. Edit `index.html` to add the flipbook to the navbar, following the convention of previous entries.
4. Edit `assets/js/index.js`. Update the `validFlipbooks` and `flipbookNames` objects and anything else that I may have missed.
5. Run locally to debug before pushing! The easiest way (on Linux) is installing busybox and running `busybox httpd` (kill with `pkill httpd`)

### How do I update a flipbook?
1. Use the Spaces frontend on DigitalOcean to replace the previous version. Confirm that you want to replace the file if it prompts you to.
2. Purge the CDN cache for that flipbook. It should be under the options for that item.
3. Wait. CDN cache takes ~5 minutes to update, while the browser cache timeout for the items in the bucket is set to 1 hour.

### How do I delete a flipbook?
1. Remove the option from `index.html` and `assets/js/index.js`.
2. Delete the file from Spaces.

## Technical Reference
The hardest part to explain would probably be configuring the flipbook library. But it's also not too difficult - edit the `options` object with the options
found at https://3dflipbook.net/documentation. The biggest change I did was enable single-page view instead of two-page view (known as smart pan for some reason
it aint smart), which is passed under `controlsProps`. Check out https://3dflipbook.net/controls-customization for reference.  

You may also want to look into using tools like GhostScript to optimize PDF sizes, in case they're too big. But in most cases file size isn't a concern, since
aesthetics is likely more important.
