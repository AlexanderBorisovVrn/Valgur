import { BaseRecord} from "@pankod/refine-core";

export type PropertyImageProps = {
  name: string;
  url: string;
};

enum Properties {
  Apartment = "APARTMENT",
  Villa = "VILLA",
  Farmhouse = "FARMHOUSE",
  Condos = "CONDOS",
  Townhouse = "TOWNHOUSE",
  Duplex = "DUPLEX",
  Studio = "STUDIO",
  Chalet = "CHALET",
}

type PropertyType = `${Properties}`;

export interface IProperty extends BaseRecord{
  creator?:string;
  location?: string;
  photo?:string;
  price?: number;
  description?: string;
  propertyType?: PropertyType;
  title:string;
}
