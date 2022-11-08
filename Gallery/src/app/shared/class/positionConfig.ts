export class PositionConfig{
  position_id: number
  material_id: number
  exhibit_url: string
  exhibit_type: string
  uuid?: string


  constructor(position_id: number, material_id: number, exhibit_url: string, exhibit_type: string, uuid: string | undefined) {
    this.position_id = position_id;
    this.material_id = material_id;
    this.exhibit_url = exhibit_url;
    this.exhibit_type = exhibit_type;
    this.uuid = uuid;
  }
}
