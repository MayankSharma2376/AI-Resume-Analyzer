export default function Results() {

  const data = localStorage.getItem("resume-analysis");

  console.log("Stored Analysis:", data);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resume Analysis</h1>

      <pre>
        {data}
      </pre>
    </div>
  );
}