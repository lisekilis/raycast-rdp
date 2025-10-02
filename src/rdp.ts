import { showHUD, LaunchProps } from "@raycast/api";
import { exec } from "child_process";

export default async function main(props: LaunchProps) {
  const address = props.arguments.address;
  if (!address) {
    await showHUD("No address provided");
    return;
  }

  await showHUD(`Starting RDP session to ${address}`);

  //check os and run appropriate command
  const os = process.platform;
  switch (os) {
    case "win32":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exec(`mstsc /v:${address}`, async (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`exec error: ${error}`);
          await showHUD(`Error starting RDP session: ${error.message}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      break;
    case "darwin":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exec(`open rdp://full%20address=s:${address}`, async (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`exec error: ${error}`);
          await showHUD(`Error starting RDP session: ${error.message}`);
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
