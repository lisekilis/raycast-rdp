import { showHUD, LaunchProps } from "@raycast/api";
import { exec } from "child_process";

export default async function main(props: LaunchProps) {
  const server = props.arguments.server;
  if (!server) {
    await showHUD("No server address provided");
    return;
  }

  await showHUD(`Starting RDP session to ${server}`);

  //check os and run appropriate command
  const os = process.platform;
  switch (os) {
    case "win32":
      exec(`mstsc /v:${server}`, async (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`exec error: ${error}`);
          showHUD(`Error starting RDP session: ${error.message}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      break;
    case "darwin":
      exec(`open rdp://${server}`, async (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`exec error: ${error}`);
          showHUD(`Error starting RDP session: ${error.message}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      break;
    default:
      await showHUD("Unsupported OS");
      break;
  }
}
