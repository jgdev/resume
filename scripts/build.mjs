import { exec } from "child_process";
import fs from "fs";

const toExec = `cat ${process.env.INPUT_FILE || "README.md"} | marked`;

exec(toExec, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  const html = `<html>
<head>
  <title>JGDev - CV</title>
  <link rel="stylesheet" href="./assets/styles/index.css" />
</head>
<body>
  <main>${stdout
    .replace(
      new RegExp('<a href="./', "gmi"),
      '<a href="https://github.com/jgdev/resume/blob/main/'
    )
    .replace(new RegExp("&nbsp;&nbsp;", "gmi"), "")}</main>
</body>
</html>`;

  fs.writeFileSync(process.env.OUTPUT_FILE || "cv.html", html);
});
