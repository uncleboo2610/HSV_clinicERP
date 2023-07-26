import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export const httpClient = axios.create({
    transformResponse: [
        ...(axios.defaults.transformResponse as any[]),
        (data) =>
            camelcaseKeys(data, {
                deep: true,
            }),
    ],
    responseType: "json",
});