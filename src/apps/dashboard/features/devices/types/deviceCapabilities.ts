/** Response of the server's GET /Devices/Capabilities endpoint (not yet part of the SDK). */
export interface DeviceCapabilities {
    DeviceId?: string | null
    /** The last client capabilities reported by the device, serialized as JSON. */
    Capabilities?: string | null
    /** The last device profile the device sent with a playback info request, serialized as JSON. */
    PlaybackDeviceProfile?: string | null
}
