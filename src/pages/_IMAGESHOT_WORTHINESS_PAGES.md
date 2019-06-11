# All Page Not Worthy Image Shot
## Tools' Focus:
  - Focusing the end snapshot to be for:
    - Greater Page Layout Diffs With Responsive Diff
    - [ ? ] Section Diffs Focus on Responsive Diff
      - Header
      - Footer
      - PDP
      - Modals
    - Modal Position In Page Diffs

## Reason
  - Major Page Dynamic Content Change Produce Noise

## Resolution TODO!!!
  - Allow all these pages, by dynamically replace all content that is dynamically generated, this is something can be set in .evaluate section
    - Place placeholder dom blocks / text replacement onto specific dom when fully loaded


## New Components
- Dynmamic Dom Mocking Function
  - dynamically measure size of dom, remove all content within and replace it with grey space with cooresponding size

## List of Page Worthy + Dynamic Parts
- Home Page
  - Parts
    - Shop by Pet Section on hover
      - dynamic: popular brands (? - need confirm )
      - dynamic: advertisement CTA block far right (? - need confirm )
    - Free 1-2 Day shipping page Modal
    - 24/7 Help Modal
    - Account Modal
    - Cart
      - Empty
- Login Page
- Create Account Page
- Product Detail Page
* NOTE: maybe its worth it to think of fragment snapshots?
  - * Different types of products?
    - Vet
    - Regular
    - FIBEE
  - dynamic (TOP TO BOTTOM):
    - Cart Count
      - span class="quantity quantity-small"
    - Breadcrumb
      - nav class="breadcrumbs container"
    - Product Images
      - class="product-image-zoomer"
    - stars count and status
      - class="ugc ugc-head" -> class="hide-phone" -> img
    - List Price vs Price vs Save
      - p class="price"
      - span ga-eec__price
      - li class="you-save" -> p class="price"
    - Autoship & Save Price and Save an Extra
      - p class="autoship-pricing p"
    - Stock
      - span class="available in-stock"
    - Questions & Answers
      - empty / populate
      - Ask a Question Modal
    - Customer Reviews
      - empty / populate
      - Write A Review Page (may can be independent)
        - View tips and guideline
    - Pet Lovers Also Bought
  - Add to Autoship
    - Half Authenticated
    - Not Logged In
    - Logged In
    -
- https://www-qa.chewy.net/app/content/contact
- https://www-qa.chewy.net/app/content/about-us
- https://www-qa.chewy.net/app/content/our-team
- https://www-qa.chewy.net/app/content/faq
  - dynamic, maybe its dynamic?



## List Of Pages Not Worthy
- product search result page (too dynamic, may worth it for predicatable empty page, 1 result view, or xx # of results view)
  - https://www-qa.chewy.net/s?query=litter&nav-submit-button=
- brands page (giantic screenshot size, with very low usage)
  - https://www-qa.chewy.net/brands
- today's deal page (too dynamic in content)
  - https://www-qa.chewy.net/deals
- Pharmacy page (and all sub pages, same reason as today's deal)
  - https://www-qa.chewy.net/b/pharmacy-6078
-


