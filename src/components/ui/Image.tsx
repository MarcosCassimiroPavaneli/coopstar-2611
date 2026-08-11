type PictureProps = {
  base: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
};

export function Picture({ base, alt, className = "", loading = "lazy" }: PictureProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.webp`}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
}
