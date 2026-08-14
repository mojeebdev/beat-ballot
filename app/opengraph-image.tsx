import { ImageResponse } from "next/og";

export const alt = "Beat Ballot — Hit for Hit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#10231c", color: "#f0e9cc", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "64px", width: "100%" }}>
      <div style={{ color: "#e9b34b", display: "flex", flexDirection: "column", fontFamily: "monospace", fontSize: 22, letterSpacing: 4 }}><span>BEAT</span><span>BALLOT.</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 145, letterSpacing: -12, lineHeight: .72 }}><span>HIT</span><span style={{ color: "#e9b34b" }}>/</span><span>FOR</span><span style={{ color: "#e9b34b" }}>/</span><span>HIT</span></div><div style={{ color: "#e9b34b", display: "flex", fontFamily: "monospace", fontSize: 20, letterSpacing: 3, marginTop: 42 }}>OLAMIDE &nbsp; VS &nbsp; DAVIDO / SEASON 01</div></div>
      <div style={{ borderTop: "1px solid rgba(240,233,204,.45)", display: "flex", fontFamily: "monospace", fontSize: 16, justifyContent: "space-between", paddingTop: 18 }}><span>THE SONGS. THE MOMENT. YOUR BALLOT.</span><span>INDEPENDENT / UNAFFILIATED</span></div>
    </div>,
    size,
  );
}
