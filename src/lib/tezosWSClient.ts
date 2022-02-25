import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://api.hangzhou2net.tzkt.io/v1/events")
  .build();

export async function getConnection() {
  if (connection.state === signalR.HubConnectionState.Connected)
    return connection;

  await connection.start();

  return connection;
}

export default connection;
