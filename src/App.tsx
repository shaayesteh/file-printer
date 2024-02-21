import { useState } from "react";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setFile(files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const parsedData = parseCSV(event.target.result);
      setCsvData(parsedData);
    };
    reader.readAsText(file);
  };

  function parseCSV(csvText: string): string[][] {
    return csvText
      .split("\n")
      .map((row: string) => row.split(","))
      .filter((row: string[]) => row.length > 0);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div>
          <label htmlFor="file">choose a csv file</label>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <button type="submit" onClick={handleSubmit} disabled={!file}>
          Print the Sheet
        </button>
        <div>
          {csvData.length > 0 && (
            <table>
              <thead>
                <tr>
                  {csvData[0].map((header: string) => (
                    <th>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(1).map((row: string[]) => (
                  <tr>
                    {row.map((cell: string) => (
                      <td>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
