export interface RaceResult {
  id: number;
  race_id: number;
  driver_id: number;
  driver_name: string;
  position: number | null;
  dnf: boolean;
  fastest_lap: boolean;
}

export interface Race {
  id: number;
  name: string;
  location: string;
  date: string;
  status: 'upcoming' | 'in_progress' | 'completed';
}

export interface Driver {
  id: number;
  name: string;
  team: string;
  number: number;
}

export async function getRaces(db: any, status?: string): Promise<Race[]> {
  try {
    let query = 'SELECT id, name, location, date, status FROM races';
    
    if (status) {
      query += ' WHERE status = ?';
      const result = await db.prepare(query).bind(status).all();
      return result.results;
    } else {
      const result = await db.prepare(query).all();
      return result.results;
    }
  } catch (error) {
    console.error('Error fetching races:', error);
    return [];
  }
}

export async function getRaceById(db: any, raceId: number): Promise<Race | null> {
  try {
    const race = await db.prepare(
      'SELECT id, name, location, date, status FROM races WHERE id = ?'
    )
    .bind(raceId)
    .first();
    
    return race;
  } catch (error) {
    console.error(`Error fetching race ${raceId}:`, error);
    return null;
  }
}

export async function getDrivers(db: any): Promise<Driver[]> {
  try {
    const result = await db.prepare(
      'SELECT id, name, team, number FROM drivers'
    ).all();
    
    return result.results;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return [];
  }
}

export async function getRaceResults(db: any, raceId: number): Promise<RaceResult[]> {
  try {
    const results = await db.prepare(`
      SELECT 
        rr.id,
        rr.race_id,
        rr.driver_id,
        d.name as driver_name,
        rr.position,
        rr.dnf,
        rr.fastest_lap
      FROM race_results rr
      JOIN drivers d ON rr.driver_id = d.id
      WHERE rr.race_id = ?
      ORDER BY CASE WHEN rr.position IS NULL THEN 999 ELSE rr.position END ASC
    `)
    .bind(raceId)
    .all();
    
    return results.results;
  } catch (error) {
    console.error(`Error fetching results for race ${raceId}:`, error);
    return [];
  }
}
