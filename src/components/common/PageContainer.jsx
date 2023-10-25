import React from 'react';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function PageContainer(
    {
        title,
        subtitle,
        children,
        action,
        footer,
        cardHeading,
        headTitle,
        headSubtitle,
        middleContent,
    }
) {
    return (
        <Card sx={{
            padding: 0,
            margin: 3,
            backgroundColor: 'secondary.light'
        }}
              elevation={1}
              variant={undefined}
        >
            {cardHeading ? (
                <CardContent>
                    <Typography variant='h5' color='primary.dark'>{headTitle}</Typography>
                    <Typography variant='subtitle2' color='primary.light'>
                        {headSubtitle}
                    </Typography>
                </CardContent>
            ) : (
                <CardContent sx={{ p: '30px' }}>
                    {title ? (
                        <Stack
                            direction='row'
                            spacing={2}
                            justifyContent='space-between'
                            alignItems='center'
                            mb={3}
                        >
                            <Box>
                                {title ? <Typography variant='h5' color='primary.dark'>{title}</Typography> : ''}

                                {subtitle ? (
                                    <Typography variant='subtitle2' color='primary.light'>
                                        {subtitle}
                                    </Typography>
                                ) : (
                                    ''
                                )}
                            </Box>
                            {action}
                        </Stack>
                    ) : null}

                    {children}
                </CardContent>
            )}

            {middleContent}
            {footer}
        </Card>
    );
};