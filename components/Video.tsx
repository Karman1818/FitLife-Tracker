import "@/styles/Video.css";

export default function Video() {
  return (
    <div>
      <video
        src="/explosion.webm"
        // width="600"
        // height="300"
        autoPlay={true}
      />
    </div>
  );
}