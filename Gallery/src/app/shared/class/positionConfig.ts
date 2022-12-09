export class PositionConfig{
  position_id: number
  material_id: number
  exhibit_url: string
  exhibit_type: string
  alignment: string
  scale_factor: number
  uuid?: string
  description: string

  constructor(position_id: number, material_id: number, exhibit_url: string, exhibit_type: string, alignment: string, scale_factor: number, uuid: string | undefined, description: string) {
    this.position_id = position_id;
    this.material_id = material_id;
    this.exhibit_url = exhibit_url;
    this.exhibit_type = exhibit_type;
    this.uuid = uuid;
    this.alignment = alignment;
    this.scale_factor = scale_factor;
    this.description = description;
  }
}
