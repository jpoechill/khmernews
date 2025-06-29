# Article Images Directory

This directory contains images for articles. To add an image to an article:

1. **Upload your image** to this directory (e.g., `my-article-image.jpg`)
2. **Update the article data** in `data/articles.tsx` by adding an `image` object:

```typescript
{
    "slug": "your-article-slug",
    "title": "Your Article Title",
    "date": "2025-01-01",
    "image": {
        "url": "/images/my-article-image.jpg",
        "alt": "Descriptive alt text for accessibility",
        "caption": "Optional caption that appears below the image"
    },
    // ... rest of article data
}
```

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended max width 1200px, max height 800px
- **File size**: Keep under 500KB for optimal loading
- **Alt text**: Provide descriptive alt text for accessibility
- **Caption**: Optional but recommended for context

## Example Images

- `khmer-thai-border.jpg` - Border crisis article
- `sabaidee-fest-2025.jpg` - Festival article

## Notes

- Images are optional - articles without an `image` field will display normally
- Images are displayed in a responsive container with rounded corners and shadow
- Captions are styled in italic gray text below the image 