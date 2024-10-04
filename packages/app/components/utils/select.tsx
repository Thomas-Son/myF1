import { Select } from '@my/ui';
import React from "react";
import { Check, ChevronDown } from '@tamagui/lucide-icons'

export default function SelectForm({value, setValue, title, list}) {
    return(
        <Select value={value} onValueChange={setValue}>
            <Select.Trigger iconAfter={ChevronDown}>
                <Select.Value placeholder={title} />
            </Select.Trigger>
            <Select.Content zIndex={200000}>

                <Select.Viewport
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>{title}</Select.Label>
                        {React.useMemo(
                            () =>
                                (list).map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.name}
                                            value={item.name}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [list]
                        )}
                    </Select.Group>
                </Select.Viewport>

            </Select.Content>
        </Select>
    )
};