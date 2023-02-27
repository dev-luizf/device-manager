import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  onNewDevice(device: any) {
    this.server.emit('newDevice', {
      data: device,
      message: 'New device created',
    });
  }

  onUpdateDevice(data: any) {
    this.server.emit('updateDevice', {
      data: data,
      message: 'Device updated with the data provided',
    });
  }
}
