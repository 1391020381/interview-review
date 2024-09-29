import { Dayjs } from "dayjs";
import { CalendarProps } from ".";
interface MonthCalendarProps extends CalendarProps {
    selectHandler?: (date: Dayjs) => void;
    curMonth: Dayjs;
}
declare function MonthCalendar(props: MonthCalendarProps): import("react/jsx-runtime").JSX.Element;
export default MonthCalendar;
