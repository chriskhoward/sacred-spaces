export interface LiveClass {
    _id: string;
    title: string;
    instructor: string;
    dateTime: string;
    duration: string;
    type: string;
    category?: string;
    description: string;
    zoomLink?: string;
    isRecurring?: boolean;
    recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';
    recurrenceEndDate?: string;
    isLocked?: boolean;
    targetAudience?: string;
}

/**
 * Generates individual class instances for recurring schedules
 */
export function generateRecurringInstances(cls: LiveClass): LiveClass[] {
    if (!cls.isRecurring || !cls.recurrencePattern) {
        return [cls];
    }

    const instances: LiveClass[] = [];
    const startDate = new Date(cls.dateTime);
    const endDate = cls.recurrenceEndDate
        ? new Date(cls.recurrenceEndDate)
        : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days out if no end date

    let currentDate = new Date(startDate);
    let instanceCount = 0;
    const maxInstances = 12; // Limit to prevent infinite loops

    while (currentDate <= endDate && instanceCount < maxInstances) {
        instances.push({
            ...cls,
            _id: `${cls._id}-${instanceCount}`,
            dateTime: currentDate.toISOString(),
        });

        // Advance to next occurrence
        switch (cls.recurrencePattern) {
            case 'weekly':
                currentDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                break;
            case 'biweekly':
                currentDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
                break;
            case 'monthly':
                currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
                break;
        }
        instanceCount++;
    }

    return instances;
}
