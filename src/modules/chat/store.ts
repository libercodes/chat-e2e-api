import { Room } from '../../models/room';

export class Store {
  private static instance: Store = null;

  private onGoingRooms: Room[] = [];

  private constructor() {
    // eslint-disable-next-line no-console
    console.log('Store initialized');
  }

  public static getInstance() {
    if (!this.instance) Store.instance = new Store();
    return this.instance;
  }

  public addRoom(room: Room) {
    this.onGoingRooms.push(room);
  }

  public findRoom(code: string): Room | undefined {
    return this.onGoingRooms.find((room: Room) => room.code === code);
  }

  public getPublicRooms(): Room[] {
    return this.onGoingRooms.filter((room: Room) => room.isPublic);
  }

  public endRoom(code: string): Room | undefined {
    const room = this.findRoom(code);
    this.onGoingRooms = this.onGoingRooms.filter((x) => x.code !== code);
    return room;
  }

  public updateRoomLastActivity(code: string) {
    const room = this.findRoom(code);
    if (room) room.lastActivity = new Date();
  }

  public addParticipant(code: string) {
    const room = this.findRoom(code);
    if (room) room.participants += 1;
  }

  public removeParticipant(code: string) {
    const room = this.findRoom(code);
    if (room && room.participants >= 1) room.participants -= 1;
    if (room && room.participants === 0) {
      // eslint-disable-next-line no-console
      console.log(`[ROOM CLOSED] All participants left room ${code}`);
      this.endRoom(code);
    }
  }
}
