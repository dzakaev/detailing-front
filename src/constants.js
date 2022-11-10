import * as yup from "yup";

export const currencies = [  //массив для выбора единицы исчисления при добавлении материала //
    {
        value: null,
    },
    {
        value: "шт",
        label: "шт",
    },
    {
        value: "кг",
        label: "кг",
    },
    {
        value: "л",
        label: "л",
    },
];

export const schema = yup.object({  //схема валидации инпута при добавлении материала //
    name: yup.string().required("Введите наименование"),
    price: yup.string().required("Введите цену"),
    volumeType: yup.string().required("Выберите единицу")
})