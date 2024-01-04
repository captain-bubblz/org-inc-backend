import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io'

const msgs = [
  'What gives you 68% likelihood?',
  'Certainly, here’s some reasoning',
  'There is a good engagement on the last marketing campaign',
  'Updating the Dashboard...',
  'Ads generated significantly more engagement',
]

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('notification')
  handleNotification(client: any, paylaod: any): void {
    this.server.emit('notification', msgs[Math.floor((5 * Math.random()))])
  }
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('handle connection')
  }

  handleDisconnect(client: any) {
    console.log('handle disconnet')
  }
}
