import { TranscodeReason } from '@jellyfin/sdk/lib/generated-client/models/transcode-reason';
import globalize from 'lib/globalize';

/** Translation keys for a short, actionable hint for each transcode reason. */
const hintKeys: Record<TranscodeReason, string> = {
    [TranscodeReason.ContainerNotSupported]: 'ContainerNotSupportedHint',
    [TranscodeReason.VideoCodecNotSupported]: 'VideoCodecNotSupportedHint',
    [TranscodeReason.AudioCodecNotSupported]: 'AudioCodecNotSupportedHint',
    [TranscodeReason.SubtitleCodecNotSupported]: 'SubtitleCodecNotSupportedHint',
    [TranscodeReason.AudioIsExternal]: 'AudioIsExternalHint',
    [TranscodeReason.SecondaryAudioNotSupported]: 'SecondaryAudioNotSupportedHint',
    [TranscodeReason.VideoProfileNotSupported]: 'VideoProfileNotSupportedHint',
    [TranscodeReason.VideoLevelNotSupported]: 'VideoLevelNotSupportedHint',
    [TranscodeReason.VideoResolutionNotSupported]: 'VideoResolutionNotSupportedHint',
    [TranscodeReason.VideoBitDepthNotSupported]: 'VideoBitDepthNotSupportedHint',
    [TranscodeReason.VideoFramerateNotSupported]: 'VideoFramerateNotSupportedHint',
    [TranscodeReason.RefFramesNotSupported]: 'RefFramesNotSupportedHint',
    [TranscodeReason.AnamorphicVideoNotSupported]: 'AnamorphicVideoNotSupportedHint',
    [TranscodeReason.InterlacedVideoNotSupported]: 'InterlacedVideoNotSupportedHint',
    [TranscodeReason.AudioChannelsNotSupported]: 'AudioChannelsNotSupportedHint',
    [TranscodeReason.AudioProfileNotSupported]: 'AudioProfileNotSupportedHint',
    [TranscodeReason.AudioSampleRateNotSupported]: 'AudioSampleRateNotSupportedHint',
    [TranscodeReason.AudioBitDepthNotSupported]: 'AudioBitDepthNotSupportedHint',
    [TranscodeReason.ContainerBitrateExceedsLimit]: 'ContainerBitrateExceedsLimitHint',
    [TranscodeReason.VideoBitrateNotSupported]: 'VideoBitrateNotSupportedHint',
    [TranscodeReason.AudioBitrateNotSupported]: 'AudioBitrateNotSupportedHint',
    [TranscodeReason.UnknownVideoStreamInfo]: 'UnknownVideoStreamInfoHint',
    [TranscodeReason.UnknownAudioStreamInfo]: 'UnknownAudioStreamInfoHint',
    [TranscodeReason.DirectPlayError]: 'DirectPlayErrorHint',
    [TranscodeReason.VideoRangeTypeNotSupported]: 'VideoRangeTypeNotSupportedHint',
    [TranscodeReason.VideoCodecTagNotSupported]: 'VideoCodecTagNotSupportedHint',
    [TranscodeReason.StreamCountExceedsLimit]: 'StreamCountExceedsLimitHint',
    [TranscodeReason.VideoRotationNotSupported]: 'VideoRotationNotSupportedHint'
};

export interface TranscodeReasonText {
    /** What the server found, e.g. "The number of streams exceeds the limit". */
    reason: string;
    /** What can be done about it, if known. */
    hint?: string;
}

/**
 * Turns a transcode reason reported by the server into display text with a hint on how to avoid it.
 * @param reason The transcode reason, as reported in TranscodingInfo.TranscodeReasons.
 * @returns The translated reason and, for known reasons, a translated hint.
 */
export function getTranscodeReasonText(reason: string): TranscodeReasonText {
    const hintKey = hintKeys[reason as TranscodeReason];

    return {
        reason: globalize.translate(reason),
        hint: hintKey ? globalize.translate(hintKey) : undefined
    };
}
