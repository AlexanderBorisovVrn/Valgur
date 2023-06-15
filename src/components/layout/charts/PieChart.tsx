import { Box, Typography, Stack } from '@pankod/refine-mui';
import { IPieChart } from 'interfaces/chart';
import ReactApexChart from 'react-apexcharts';



const PieChart = ({ title, value, series, colors }: IPieChart) => {
  return (
    <Box
    id='chart'
    display='flex'
    bgcolor='#fcfcfc'
    flexDirection ='row'
    justifyContent='space-between'
    alignItems='center'
    pl={3.5}
    py={2}
    gap={{xs:'1',md:'2'}}
    borderRadius='15px'
    minHeight='110px'
    width={{xs:'100%',sm:'calc(100% / 2 - 40px)',lg:'calc(100% / 4 - 25px)'}}

    >
      <Stack direction='column'>
        <Typography
          fontSize={14}
          color='#808191'
        >{title}</Typography>
        <Typography
          fontWeight={700}
          color='#11142d'
          mt={1}
        >{value}</Typography>
      </Stack>

      <ReactApexChart
        options={
          {
            chart: { type: 'donut' },
            colors,
            legend: { show: false },
            dataLabels: { enabled: false }
          }
        }
        series={series}
        type='donut'
        width='120px'
      />
    </Box>
  )
}

export default PieChart;