import { Link, Stack, Tooltip, Typography } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'

export default function Footer() {
  return (
    <Stack alignItems="center" gap="7px" p="50px 0" mt="auto">
      <Stack flexDirection="row" alignItems="center" gap="5px">
        <Typography fontSize="20px">Developed by</Typography>
        <Link
          href="https://haophan.netlify.app/"
          target="_blank"
          sx={{
            ':hover': { textDecoration: 'none' },
            textDecoration: 'underline',
          }}
        >
          <Tooltip title="Porfolio" arrow>
            <Typography color="primary" fontSize="20px" fontWeight={600}>
              Hao Phan
            </Typography>
          </Tooltip>
        </Link>
      </Stack>
      <Stack flexDirection="row" gap="5px">
        <Link
          href="https://www.linkedin.com/in/hao-phan-06b628110/"
          target="_blank"
        >
          <Tooltip title="Linkedin" arrow>
            <LinkedIn
              sx={{ fontSize: '35px', ':hover': { color: '#ff00b7' } }}
            />
          </Tooltip>
        </Link>
        <Link href="https://github.com/nguyenhaophan/easyhome" target="_blank">
          <Tooltip title="Github" arrow>
            <GitHub sx={{ fontSize: '35px', ':hover': { color: '#ff00b7' } }} />
          </Tooltip>
        </Link>
      </Stack>
    </Stack>
  )
}
