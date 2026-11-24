import type { DeviceInfoDto } from '@jellyfin/sdk/lib/generated-client/models/device-info-dto';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { type FC, useCallback, useMemo, useState } from 'react';

import Toast from 'apps/dashboard/components/Toast';
import { useDeviceCapabilities } from 'apps/dashboard/features/devices/api/useDeviceCapabilities';
import globalize from 'lib/globalize';
import { copy } from 'scripts/clipboard';

const formatJson = (value?: string | null) => {
    if (!value) return undefined;

    try {
        return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
        return value;
    }
};

interface JsonSectionProps {
    title: string
    json?: string
    onCopy: (json: string) => void
}

const JsonSection: FC<JsonSectionProps> = ({ title, json, onCopy }) => (
    <Box>
        <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='h3' fontWeight='bold'>{title}</Typography>
            {json && (
                <Tooltip title={globalize.translate('Copy')}>
                    <IconButton size='small' onClick={() => onCopy(json)}>
                        <ContentCopy fontSize='small' />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
        {json ? (
            <Box
                component='pre'
                sx={{
                    m: 0,
                    mt: 1,
                    p: 1.5,
                    maxHeight: '40vh',
                    overflow: 'auto',
                    fontSize: '0.8rem',
                    bgcolor: 'action.hover',
                    borderRadius: 1
                }}
            >
                {json}
            </Box>
        ) : (
            <Typography color='text.secondary' sx={{ mt: 1 }}>
                {globalize.translate('DeviceCapabilitiesNotReported')}
            </Typography>
        )}
    </Box>
);

interface DeviceCapabilitiesDialogProps {
    device?: DeviceInfoDto
    onClose: () => void
}

const DeviceCapabilitiesDialog: FC<DeviceCapabilitiesDialogProps> = ({ device, onClose }) => {
    const { data, isLoading, isError } = useDeviceCapabilities(device?.Id);
    const [ isCopiedToastOpen, setIsCopiedToastOpen ] = useState(false);

    const capabilities = useMemo(() => formatJson(data?.Capabilities), [ data ]);
    const playbackDeviceProfile = useMemo(() => formatJson(data?.PlaybackDeviceProfile), [ data ]);

    const onCopy = useCallback(async (json: string) => {
        await copy(json);
        setIsCopiedToastOpen(true);
    }, []);

    const onToastClose = useCallback(() => {
        setIsCopiedToastOpen(false);
    }, []);

    return (
        <Dialog
            open={!!device}
            onClose={onClose}
            maxWidth='md'
            fullWidth
        >
            <Toast
                open={isCopiedToastOpen}
                onClose={onToastClose}
                message={globalize.translate('Copied')}
            />
            <DialogTitle>
                {device?.CustomName || device?.Name}
                {device?.AppName && (
                    <Typography component='span' display='block' color='text.secondary'>
                        {device.AppName} {device.AppVersion}
                    </Typography>
                )}
            </DialogTitle>

            <DialogContent>
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
                {isError && (
                    <Alert severity='error'>
                        {globalize.translate('DeviceCapabilitiesLoadError')}
                    </Alert>
                )}
                {data && (
                    <Stack spacing={3}>
                        <JsonSection
                            title={globalize.translate('HeaderPlaybackDeviceProfile')}
                            json={playbackDeviceProfile}
                            onCopy={onCopy}
                        />
                        <JsonSection
                            title={globalize.translate('HeaderClientCapabilities')}
                            json={capabilities}
                            onCopy={onCopy}
                        />
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    {globalize.translate('ButtonClose')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeviceCapabilitiesDialog;
