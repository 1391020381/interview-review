import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';
export interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties;
    className?: string | string[];
    dateRender?: (currentDate: Dayjs) => ReactNode;
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    locale?: string;
    onChange?: (date: Dayjs) => void;
}
declare function Calendar(props: CalendarProps): import("react/jsx-runtime").JSX.Element;
export default Calendar;
