<template>

    <v-card class="ds-calendar-event-popover-card"
            :class="classes">

        <v-toolbar extended flat
                   :style="styleHeader">

            <v-toolbar-title slot="extension">
                {{ details.title }}
                <v-icon v-if="details.icon"
                        :style="styleButton">
                    {{ details.icon }}
                </v-icon>
            </v-toolbar-title>

            <v-btn
                    v-if="allowEdit"
                    color="secondary"
                    small absolute bottom left fab icon
                    @click="edit" 
                    class="v-btn-edit"
            >
                <v-icon>fas fa-edit</v-icon>
            </v-btn>


            <slot name="eventPopoverToolbarLeft" v-bind="slotData"></slot>

            <v-spacer></v-spacer>

            <slot name="eventPopoverToolbarRight" v-bind="slotData"></slot>

    <!--         <slot name="eventPopoverToolbarActions" v-bind="slotData">

                <v-tooltip bottom v-if="!isReadOnly">
                    <template v-slot:activator="{ on }">
                        <ds-schedule-actions
                                v-on="on"
                                v-bind="{$scopedSlots}"
                                :schedule="calendarEvent.schedule"
                                :calendar-event="calendarEvent"
                                :calendar="calendar">

                            <v-btn icon :style="styleButton" style="background-color: transparent!important;">
                                <v-icon>more_vert</v-icon>
                            </v-btn>

                        </ds-schedule-actions>
                    </template>
                    <span>{{ labels.options }}</span>

                </v-tooltip>

            </slot> -->

            <slot name="eventPopoverToolbarClose" v-bind="slotData">

                <v-btn icon @click="close" :style="styleButton" style="background-color: transparent!important;">
                    <v-icon>fas fa-times</v-icon>
                </v-btn>

            </slot>

        </v-toolbar>
        <v-card-text>

            <slot name="eventPopoverBodyTop" v-bind="slotData"></slot>

            <v-list dense>

                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon>far fa-clock</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverOccurs" v-bind="slotData">
                            <v-list-item-title>{{ startDate }}</v-list-item-title>
                            <v-list-item-subtitle>{{ occurs }}</v-list-item-subtitle>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.guests">
                    <v-list-item-avatar>
                        <v-icon>fas fa-user-friends</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverGuests" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.guests"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.location">
                    <v-list-item-avatar>
                        <v-icon>fas fa-map-marker-alt</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverLocation" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.location"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.phone">
                    <v-list-item-avatar>
                        <v-icon>fas fa-phone-square-alt</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverPhone" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.phone"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.description">
                    <v-list-item-avatar>
                        <v-icon>fas fa-stream</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverDescription" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.description"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.calendar">
                    <v-list-item-avatar>
                        <v-icon>fas fa-calendar-day</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverCalendar" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.calendar"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.notifyTime && details.notifyHow">
                    <v-list-item-avatar>
                        <v-icon>fas fa-stopwatch<</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverNotifications" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.notifyTime"></span>
                                / <span v-html="details.notifyHow"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="details.show">
                    <v-list-item-avatar>
                        <v-icon>fas fa-lock</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverShow" v-bind="slotData">
                            <v-list-item-title>
                                <span v-html="details.show ? '공개' : '비공개'"></span>
                            </v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

               <!--  <v-list-item v-if="hasBusy">
                    <v-list-item-avatar>
                        <v-icon>work</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <slot name="eventPopoverBusy" v-bind="slotData">
                            <v-list-item-title>{{ busyness }}</v-list-item-title>
                        </slot>
                    </v-list-item-content>
                </v-list-item> -->

            </v-list>

            <slot name="eventPopoverBodyBottom" v-bind="slotData"></slot>

        </v-card-text>

        <slot name="eventPopoverActions" v-bind="slotData"></slot>

    </v-card>

</template>

<script>
import { CalendarEvent, Calendar, Pattern } from 'dayspan'

export default {

    name: 'dsCalendarEventPopover',

    props:
        {
            calendarEvent:
                {
                    required: true,
                    type: CalendarEvent
                },

            calendar:
                {
                    required: true,
                    type: Calendar
                },

            readOnly:
                {
                    type: Boolean,
                    default: false
                },

            edit:
                {
                    type: Function
                },

            allowEditOnReadOnly:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().allowEditOnReadOnly
                    }
                },

            close:
                {
                    type: Function
                },

            formats:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'formats')
                    },
                    default () {
                        return this.$dsDefaults().formats
                    }
                },

            labels:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'labels')
                    },
                    default () {
                        return this.$dsDefaults().labels
                    }
                }
        },

    computed:
        {
            slotData () {
                return {
                    calendarEvent: this.calendarEvent,
                    calendar: this.calendar,
                    edit: this.edit,
                    close: this.close,
                    details: this.details,
                    readOnly: this.readOnly
                }
            },

            classes () {
                return {
                    'ds-event-cancelled': this.calendarEvent.cancelled
                }
            },

            styleHeader () {
                return {
                    backgroundColor: this.details.color,
                    color: this.details.forecolor
                }
            },

            styleButton () {
                return {
                    color: this.details.forecolor
                }
            },

            startDate () {
                return this.calendarEvent.start.format(this.formats.start)
            },

            busyness () {
                return this.details.busy ? this.labels.busy : this.labels.free
            },

            hasBusy () {
                return typeof this.details.busy === 'boolean'
            },

            occurs () {
                return this.$dayspan.getEventOccurrence(
                    this.calendarEvent.schedule,
                    this.calendarEvent.start,
                    this.labels,
                    this.formats
                )
            },

            details () {
                return this.calendarEvent.event.data
            },

            allowEdit () {
                return this.allowEditOnReadOnly || !this.isReadOnly
            },

            isReadOnly () {
                return this.readOnly || this.$dayspan.readOnly || this.details.readonly
            }
        },

    data: vm => ({}),

    methods:
        {}
}
</script>

<style scoped lang="scss">

    .ds-calendar-event-popover-card {

        .v-btn--floating.v-btn--left {
            margin-left: 0px !important;

            .v-icon {
                height: auto;
            }
        }

        .v-btn-edit {
            margin-left: 0!important;
            background-color: #424242!important; 
            i {
                color: #fff!important;
            }
        }

        .v-card__text {
            padding: 16px 0;

            .v-list {

                .v-list__tile {
                    padding: 0px !important;
                    height: auto;

                    .v-list__tile__sub-title {

                    }
                }
            }
        }

        .v-toolbar__extension {
            padding: 0 16px !important;

            .v-toolbar__title {
                margin-left: 56px;
            }
        }
    }

</style>
