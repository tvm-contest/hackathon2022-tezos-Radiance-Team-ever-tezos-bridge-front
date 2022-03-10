import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://api.hangzhou2net.tzkt.io/v1/events")
  .build();

export default connection;
