import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react"
export default function ThemeSwither() {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    return (
        <Switch
            size="md"
            onLabel={
                <IconSun
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-yellow-4)"
                />
            }
            offLabel={
                <IconMoonStars
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-blue-6)"
                />
            }
            checked={colorScheme === "light"}
            onChange={(e) =>
                setColorScheme(e.currentTarget.checked ? "light" : "dark")
            }
        />
    )
}