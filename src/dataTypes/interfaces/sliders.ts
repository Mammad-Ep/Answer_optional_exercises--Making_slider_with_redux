export interface ISliderImage {
    id: number,
    src: string
}

export interface ISliders {
    imageList: ISliderImage[],
    imageListLenght: number,
    count: number,
    errorMessage: null | string
};



