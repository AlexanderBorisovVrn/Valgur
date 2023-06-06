import React, { useEffect, useState } from "react";
import { YMaps, Map as Ymap, Placemark } from "@pbe/react-yandex-maps";
import { Box } from "@pankod/refine-mui";
import getGeocode from "utils/getGeocode";

type Props = {
  location: [number, number];
};

export function Map({ location = [55.684758, 37.738521] }: Props) {
  const [coordinates, _setCoordinates] = useState<[number, number]>([
    55.684758, 37.738521,
  ]);
  useEffect(() => {
    getGeocode(location)
      .then((res) => {
        _setCoordinates(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <YMaps>
      <Ymap
        width={"100%"}
        height={"100%"}
        defaultState={{ center: coordinates, zoom: 7 }}
      >
        {coordinates.map((coordinate, index) => (
          <Placemark
            key={`${index}-${coordinate}`}
            geometry={coordinates}
            options={{
              iconLayout: "default#image",
              iconImageSize: [50, 50],
            }}
          />
        ))}
      </Ymap>
    </YMaps>
  );
}
