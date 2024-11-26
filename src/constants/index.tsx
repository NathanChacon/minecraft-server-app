import ironImg from '../assets/iron_img.webp'
import diamondImg from '../assets/diamond_img.webp'
import goldImg from '../assets/gold_img.webp'
import emeraldImg from '../assets/emerald_img.webp'
import redstoneImg from '../assets/redstone_img.webp'

export const daysOfWeek = [
    { label: "Segunda-feira", value: "monday", userField: "availableDays" },
    { label: "Terça-feira", value: "tuesday", userField: "availableDays"},
    { label: "Quarta-feira", value: "wednesday", userField: "availableDays" },
    { label: "Quinta-feira", value: "thursday", userField: "availableDays"},
    { label: "Sexta-feira", value: "friday", userField: "availableDays" },
    { label: "Sábado", value: "saturday", userField: "availableDays"},
    { label: "Domingo", value: "sunday", userField: "availableDays"},
];


export const gameModes = [
    { label: "PVP", value: "pvp", userField: "gameModes" },
    { label: "Criativo", value: "creative", userField: "gameModes"},
    { label: "Sobrevivência", value: "survival", userField: "gameModes" },
    { label: "Pacífico", value: "peaceful", userField: "gameModes"}
]

export const ores = [
    { label: "Ferro", value: "iron", userField: "ores", img: ironImg },
    { label: "Ouro", value: "gold", userField: "ores", img: goldImg},
    { label: "Diamante", value: "diamond", userField: "ores", img: diamondImg },
    { label: "Redstone", value: "redstone", userField: "ores", img: redstoneImg},
    { label: "Esmeralda", value: "emerald", userField: "ores", img: emeraldImg}
];