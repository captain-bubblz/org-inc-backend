import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ArticleService } from './services/article.service';

const msgs = [
  'What gives you 68% likelihood?',
  'Certainly, here’s some reasoning',
  'There is a good engagement on the last marketing campaign',
  'Updating the Dashboard...',
  'Ads generated significantly more engagement',
];

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // constructor(private readonly articleService: ArticleService) {

  // }
  private readonly articleService = new ArticleService();
  @SubscribeMessage('notification')
  handleNotification(client: any, paylaod: any): void {
    console.log('got notification request');
    this.server.emit('notification', msgs[Math.floor(5 * Math.random())]);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, paylaod: any): void {
    console.log('got notification request');
    this.server.emit('message', this.articleService.get());
  }

  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('handle connection');
  }

  handleDisconnect(client: any) {
    console.log('handle disconnet');
  }
}
