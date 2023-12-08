import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export class WebSocketChannel {
  private connections: Record<string, WebSocket> = {};

  addConnection(conn: WebSocket) {
    const connId = uuidv4();
    this.connections[connId] = conn;

    return connId;
  }

  removeConnection(connId: string, cb: (channelEmpty: boolean) => void) {
    delete this.connections[connId];

    cb(Object.keys(this.connections).length === 0);
  }

  sendMessage<T extends Object = Object>(message: T) {
    Object.values(this.connections).forEach((conn) =>
      conn.send(JSON.stringify(message)),
    );
  }
}

export class WebSocketManager {
  private channels: Record<string, WebSocketChannel> = {};

  constructor(port: number) {
    const wss = new WebSocketServer({ port, path: '/ws' });

    wss.on('connection', (conn, req) => {
      const handle = new URL(
        'https://www.bitmetro.io' + req.url,
      ).searchParams.get('handle');

      const channel = this.getChannel(handle);

      const connId = channel.addConnection(conn);

      conn.on('close', () => {
        channel.removeConnection(
          connId,
          (empty) => empty && delete this.channels[handle],
        );
      });
    });
  }

  getChannel(handle: string) {
    return (this.channels[handle] =
      this.channels[handle] || new WebSocketChannel());
  }
}
