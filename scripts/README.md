# Image Optimization

This directory contains scripts for optimizing images in the project.

## Optimize Images Script

The `optimize-images.js` script reduces the file size of images in the project by:

- Resizing large images to a maximum width of 800px
- Compressing JPG/JPEG images to 80% quality
- Converting images to progressive JPEGs for faster loading

### Usage

1. Install dependencies:

```bash
npm install
```

2. Run the optimization script:

```bash
npm run optimize-images
```

3. The script will:
   - Process all images in the specified directories
   - Create optimized versions in the `/optimized` subdirectories
   - Show statistics about file size savings

### Configuration

You can modify the following settings in the script:

- `QUALITY`: JPEG compression quality (default: 80)
- `MAX_WIDTH`: Maximum width for resizing images (default: 800px)
- `IMAGE_DIRS`: Directories containing images to optimize
- `OUTPUT_DIRS`: Directories where optimized images will be saved

## Next.js Image Optimization

In addition to the script, the project uses Next.js's built-in image optimization:

- `sizes` attribute to help the browser select the right image size
- `quality` parameter set to 80% for good balance of quality and file size
- `loading="lazy"` for images below the fold
- `placeholder="blur"` for a better loading experience

These optimizations help improve page load times and Core Web Vitals scores.
