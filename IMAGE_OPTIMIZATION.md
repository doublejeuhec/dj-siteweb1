# Image Optimization Guide

This guide explains how we've optimized images in the project to improve loading times and performance.

## Optimization Results

Running our optimization script on the promo images resulted in:

- Promo2024 images: 99.1-99.5% reduction (from 4-7MB down to 24-55KB)
- Promo2025 images: 45-51% reduction (from 74-178KB down to 36-91KB)

## How We Optimized Images

### 1. Server-side Optimization with Sharp

We use the `sharp` library to optimize images before they're served:

```bash
# Install sharp
npm install sharp --save-dev

# Run the optimization script
npm run optimize-images
```

The script in `scripts/optimize-images.js`:

- Resizes large images to a maximum width of 800px
- Compresses JPG/JPEG images to 80% quality
- Converts images to progressive JPEGs for faster loading
- Creates optimized versions in `/optimized` subdirectories

### 2. Next.js Image Component Optimization

We use Next.js's built-in `Image` component with these optimizations:

```jsx
<Image
  src={imagePath}
  alt={imageAlt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={80}
  loading={index < 4 ? "eager" : "lazy"}
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
/>
```

Key features:

- `sizes` attribute helps browsers select the right image size
- `quality={80}` balances quality and file size
- `loading="lazy"` defers loading of off-screen images
- `placeholder="blur"` shows a placeholder during loading
- `priority` for above-the-fold images

## Adding New Images

When adding new images to the project:

1. Place original images in the appropriate directory (e.g., `/public/images/CF/Promo2024/`)
2. Run the optimization script: `npm run optimize-images`
3. Use the optimized image path in your code (e.g., `/images/CF/Promo2024/optimized/image.jpg`)
4. Use the Next.js Image component with the optimization attributes

## Further Improvements

Consider these additional optimizations:

- Convert images to WebP format for even smaller file sizes
- Implement responsive images with multiple sizes
- Use a CDN for global image delivery
- Implement image lazy loading with Intersection Observer
