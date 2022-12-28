export default function FacebookPost({ href, width, height }) {
  return (
    <div>
      <iframe
        src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
          href
        )}&show_text=true`}
        width={width || "500"}
        height={height || ""}
        allowFullScreen={true}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}
