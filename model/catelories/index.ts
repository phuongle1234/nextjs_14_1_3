import React from "react";
import BaseService from "../base";
import { categories } from "@/constants/api";

const baseService = new BaseService(categories)


const categoriesModel = {
    ...baseService
}

export default categoriesModel