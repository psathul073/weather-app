import { AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid, ResponsiveContainer } from 'recharts';

const TempTrend = ({ forecast }) => {

    // 5 Day temperature trend data.
    const chartData = forecast?.map((day) => ({
        date: new Date(day.dt_txt).toLocaleDateString(),
        temp: Math.round(day.main.temp),
    }));

    return (
        <div className="tt-container h-[240px] pt-3 px-4 my-4 rounded-lg bg-white dark:bg-zinc-900 shadow flex flex-col justify-between">
            <h3 className="text-sm font-semibold mb-2">Temperature Trend</h3>

            <ResponsiveContainer width="100%" height="100%"  >
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }} >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" fontSize={10} padding={{ left: 0, right: 0 }} />
                    <YAxis domain={['auto', 'auto']} fontSize={10} width={10} />
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip contentStyle={{ color: '#52525b', }} />
                    <Area type="monotone" dataKey="temp" stroke="#f97316" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export default TempTrend